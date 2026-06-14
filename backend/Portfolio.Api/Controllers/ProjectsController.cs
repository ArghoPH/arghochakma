using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.Dtos.Projects;
using Portfolio.Api.Models;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public ProjectsController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<Project>>> GetProjects()
    {
        var projects = await _dbContext.Projects
            .AsNoTracking()
            .OrderByDescending(project => project.CreatedAtUtc)
            .ToListAsync();

        return Ok(projects);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Project>> GetProjectById(Guid id)
    {
        var project = await _dbContext.Projects
            .AsNoTracking()
            .FirstOrDefaultAsync(project => project.Id == id);

        if (project is null)
        {
            return NotFound(new { message = "Project not found." });
        }

        return Ok(project);
    }

    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<Project>> GetProjectBySlug(string slug)
    {
        var project = await _dbContext.Projects
            .AsNoTracking()
            .FirstOrDefaultAsync(project => project.Slug == slug);

        if (project is null)
        {
            return NotFound(new { message = "Project not found." });
        }

        return Ok(project);
    }

    [HttpPost]
    public async Task<ActionResult<Project>> CreateProject(CreateProjectRequest request)
    {
        var slug = await GenerateUniqueSlugAsync(request.Title);

        var project = new Project
        {
            Title = request.Title.Trim(),
            Slug = slug,
            Description = request.Description.Trim(),
            ImageUrl = request.ImageUrl,
            LiveUrl = request.LiveUrl,
            GithubUrl = request.GithubUrl,
            TechStack = request.TechStack,
            IsFeatured = request.IsFeatured,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Projects.Add(project);

        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProjectById), new { id = project.Id }, project);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateProject(Guid id, UpdateProjectRequest request)
    {
        var project = await _dbContext.Projects.FindAsync(id);

        if (project is null)
        {
            return NotFound(new { message = "Project not found." });
        }

        var slug = await GenerateUniqueSlugAsync(request.Title, id);

        project.Title = request.Title.Trim();
        project.Slug = slug;
        project.Description = request.Description.Trim();
        project.ImageUrl = request.ImageUrl;
        project.LiveUrl = request.LiveUrl;
        project.GithubUrl = request.GithubUrl;
        project.TechStack = request.TechStack;
        project.IsFeatured = request.IsFeatured;
        project.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteProject(Guid id)
    {
        var project = await _dbContext.Projects.FindAsync(id);

        if (project is null)
        {
            return NotFound(new { message = "Project not found." });
        }

        _dbContext.Projects.Remove(project);

        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    private async Task<string> GenerateUniqueSlugAsync(string title, Guid? currentProjectId = null)
    {
        var baseSlug = GenerateSlug(title);
        var slug = baseSlug;
        var counter = 1;

        while (await _dbContext.Projects.AnyAsync(project =>
            project.Slug == slug &&
            (!currentProjectId.HasValue || project.Id != currentProjectId.Value)))
        {
            slug = $"{baseSlug}-{counter}";
            counter++;
        }

        return slug;
    }

    private static string GenerateSlug(string text)
    {
        var slug = text
            .Trim()
            .ToLowerInvariant()
            .Replace(" ", "-")
            .Replace(".", "")
            .Replace(",", "")
            .Replace("/", "-")
            .Replace("\\", "-")
            .Replace(":", "")
            .Replace(";", "")
            .Replace("?", "")
            .Replace("!", "");

        return string.IsNullOrWhiteSpace(slug)
            ? Guid.NewGuid().ToString("N")[..8]
            : slug;
    }
}
