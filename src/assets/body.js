import AOS from "aos";
import "aos/dist/aos.css";

let animationFrameId = null;
let cleanupFunctions = [];

function cleanupOldJs(bubbleContainer) {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    cleanupFunctions.forEach((cleanup) => cleanup());
    cleanupFunctions = [];

    if (bubbleContainer) {
        bubbleContainer.innerHTML = "";
    }
}

export default function bodyScript({ skillsContainer, bubbleContainer }) {
    cleanupOldJs(bubbleContainer);

    AOS.init({
        duration: 1000,
        once: true,
    });

    AOS.refresh();

    if (bubbleContainer) {
        for (let i = 0; i < 25; i++) {
            const bubble = document.createElement("div");
            bubble.classList.add("bubble");

            const size = Math.random() * 80 + 20;

            bubble.style.width = size + "px";
            bubble.style.height = size + "px";
            bubble.style.left = Math.random() * 100 + "vw";
            bubble.style.animationDuration = Math.random() * 10 + 10 + "s";
            bubble.style.background =
                "radial-gradient(circle, rgba(99,102,241,0.6), transparent)";

            bubbleContainer.appendChild(bubble);
        }
    }

    const container = skillsContainer;

    if (!container) return cleanupOldJs;

    const skills = Array.from(container.querySelectorAll(".skill"));

    if (skills.length === 0) return cleanupOldJs;

    skills.forEach((skill) => {
        const rect = skill.getBoundingClientRect();

        skill.skillWidth = rect.width;
        skill.skillHeight = rect.height;

        skill.x = Math.random() * Math.max(0, container.clientWidth - skill.skillWidth);
        skill.y = Math.random() * Math.max(0, container.clientHeight - skill.skillHeight);

        skill.vx = (Math.random() - 0.5) * 0.3;
        skill.vy = (Math.random() - 0.5) * 0.3;

        skill.isDragging = false;
        skill.style.transform = `translate(${skill.x}px, ${skill.y}px)`;
    });

    skills.forEach((skill) => {
        let offsetX = 0;
        let offsetY = 0;

        const startDrag = (clientX, clientY) => {
            skill.isDragging = true;
            offsetX = clientX - skill.x;
            offsetY = clientY - skill.y;
        };

        const dragMove = (clientX, clientY) => {
            if (!skill.isDragging) return;

            skill.x = clientX - offsetX;
            skill.y = clientY - offsetY;

            skill.x = Math.max(
                0,
                Math.min(container.clientWidth - skill.skillWidth, skill.x)
            );

            skill.y = Math.max(
                0,
                Math.min(container.clientHeight - skill.skillHeight, skill.y)
            );
        };

        const endDrag = () => {
            skill.isDragging = false;
        };

        const mouseDownHandler = (event) => {
            startDrag(event.clientX, event.clientY);
        };

        const mouseMoveHandler = (event) => {
            dragMove(event.clientX, event.clientY);
        };

        const touchStartHandler = (event) => {
            const touch = event.touches[0];
            if (!touch) return;

            startDrag(touch.clientX, touch.clientY);
        };

        const touchMoveHandler = (event) => {
            if (!skill.isDragging) return;
            event.preventDefault();

            const touch = event.touches[0];
            if (!touch) return;

            dragMove(touch.clientX, touch.clientY);
        };

        skill.addEventListener("mousedown", mouseDownHandler);
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", endDrag);

        skill.addEventListener("touchstart", touchStartHandler);
        document.addEventListener("touchmove", touchMoveHandler, { passive: false });
        document.addEventListener("touchend", endDrag);

        cleanupFunctions.push(() => {
            skill.removeEventListener("mousedown", mouseDownHandler);
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", endDrag);

            skill.removeEventListener("touchstart", touchStartHandler);
            document.removeEventListener("touchmove", touchMoveHandler);
            document.removeEventListener("touchend", endDrag);
        });
    });

    function preventOverlap(skill) {
        skills.forEach((other) => {
            if (skill === other) return;

            const dx = skill.x - other.x;
            const dy = skill.y - other.y;

            const minDistX = (skill.skillWidth + other.skillWidth) / 2;
            const minDistY = (skill.skillHeight + other.skillHeight) / 2;

            if (Math.abs(dx) < minDistX && Math.abs(dy) < minDistY) {
                if (dx !== 0) skill.x += dx > 0 ? 1 : -1;
                if (dy !== 0) skill.y += dy > 0 ? 1 : -1;
            }
        });
    }

    function animate() {
        skills.forEach((skill) => {
            if (!skill.isDragging) {
                skill.x += skill.vx;
                skill.y += skill.vy;

                if (
                    skill.x < 0 ||
                    skill.x > container.clientWidth - skill.skillWidth
                ) {
                    skill.vx *= -1;
                }

                if (
                    skill.y < 0 ||
                    skill.y > container.clientHeight - skill.skillHeight
                ) {
                    skill.vy *= -1;
                }

                skill.x = Math.max(
                    0,
                    Math.min(container.clientWidth - skill.skillWidth, skill.x)
                );

                skill.y = Math.max(
                    0,
                    Math.min(container.clientHeight - skill.skillHeight, skill.y)
                );

                preventOverlap(skill);
            }

            skill.style.transform = `translate(${skill.x}px, ${skill.y}px)`;
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => cleanupOldJs(bubbleContainer);
}