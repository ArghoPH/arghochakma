using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
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
            .OrderByDescending(project => project.CreatedAtUtc)
            .ToListAsync();

        return Ok(projects);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Project>> GetProjectById(Guid id)
    {
        var project = await _dbContext.Projects.FindAsync(id);

        if (project is null)
        {
            return NotFound();
        }

        return Ok(project);
    }

    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<Project>> GetProjectBySlug(string slug)
    {
        var project = await _dbContext.Projects
            .FirstOrDefaultAsync(item => item.Slug == slug);

        if (project is null)
        {
            return NotFound();
        }

        return Ok(project);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Project>> CreateProject(CreateProjectRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest("Project title is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Description))
        {
            return BadRequest("Project description is required.");
        }

        var slug = await GenerateUniqueSlugAsync(request.Title);

        var project = new Project
        {
            Title = request.Title.Trim(),
            Slug = slug,
            Description = request.Description.Trim(),
            ImageUrl = CleanNullableString(request.ImageUrl),
            GalleryImageUrls = NormalizeImageUrls(request.GalleryImageUrls),
            LiveUrl = CleanNullableString(request.LiveUrl),
            GithubUrl = CleanNullableString(request.GithubUrl),
            TechStack = NormalizeTechStack(request.TechStack),
            IsFeatured = request.IsFeatured,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Projects.Add(project);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProjectById), new { id = project.Id }, project);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Project>> UpdateProject(Guid id, UpdateProjectRequest request)
    {
        var project = await _dbContext.Projects.FindAsync(id);

        if (project is null)
        {
            return NotFound();
        }

        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest("Project title is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Description))
        {
            return BadRequest("Project description is required.");
        }

        project.Title = request.Title.Trim();
        project.Slug = await GenerateUniqueSlugAsync(request.Title, project.Id);
        project.Description = request.Description.Trim();
        project.ImageUrl = CleanNullableString(request.ImageUrl);
        project.GalleryImageUrls = NormalizeImageUrls(request.GalleryImageUrls);
        project.LiveUrl = CleanNullableString(request.LiveUrl);
        project.GithubUrl = CleanNullableString(request.GithubUrl);
        project.TechStack = NormalizeTechStack(request.TechStack);
        project.IsFeatured = request.IsFeatured;
        project.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        return Ok(project);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteProject(Guid id)
    {
        var project = await _dbContext.Projects.FindAsync(id);

        if (project is null)
        {
            return NotFound();
        }

        _dbContext.Projects.Remove(project);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    private async Task<string> GenerateUniqueSlugAsync(string title, Guid? currentProjectId = null)
    {
        var baseSlug = GenerateSlug(title);

        if (string.IsNullOrWhiteSpace(baseSlug))
        {
            baseSlug = Guid.NewGuid().ToString("N")[..8];
        }

        var slug = baseSlug;
        var counter = 2;

        while (await _dbContext.Projects.AnyAsync(project =>
            project.Slug == slug &&
            (!currentProjectId.HasValue || project.Id != currentProjectId.Value)))
        {
            slug = $"{baseSlug}-{counter}";
            counter++;
        }

        return slug;
    }

    private static string GenerateSlug(string value)
    {
        var slug = value.Trim().ToLowerInvariant();

        slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
        slug = Regex.Replace(slug, @"\s+", "-");
        slug = Regex.Replace(slug, @"-+", "-");

        return slug.Trim('-');
    }

    private static string? CleanNullableString(string? value)
    {
        return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
    }

    private static List<string> NormalizeImageUrls(IEnumerable<string>? imageUrls)
    {
        if (imageUrls is null)
        {
            return new List<string>();
        }

        return imageUrls
            .Where(url => !string.IsNullOrWhiteSpace(url))
            .Select(url => url.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    private static List<string> NormalizeTechStack(IEnumerable<string>? techStack)
    {
        if (techStack is null)
        {
            return new List<string>();
        }

        var normalized = techStack
            .Where(tech => !string.IsNullOrWhiteSpace(tech))
            .Select(NormalizeTechName)
            .Where(tech => !string.IsNullOrWhiteSpace(tech))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        return normalized;
    }

    private static string NormalizeTechName(string value)
    {
        var cleanValue = value.Trim();

        var key = cleanValue
            .ToLowerInvariant()
            .Replace("#", "sharp")
            .Replace("+", "plus")
            .Replace(".", "")
            .Replace("-", "")
            .Replace("_", "")
            .Replace(" ", "");

        return key switch
        {
            "vue" or "vuejs" or "vue3" => "Vue",
            "vite" => "Vite",
            "javascript" or "js" => "JavaScript",
            "typescript" or "ts" => "TypeScript",
            "tailwind" or "tailwindcss" => "Tailwind CSS",
            "react" or "reactjs" => "React",
            "next" or "nextjs" => "Next.js",
            "node" or "nodejs" => "Node.js",
            "dotnet" or "net" => ".NET",
            "aspnetcore" => "ASP.NET Core",
            "csharp" => "C#",
            "efcore" or "entityframeworkcore" => "Entity Framework Core",
            "postgres" or "postgresql" => "PostgreSQL",
            "supabase" => "Supabase",
            "docker" => "Docker",
            "render" => "Render",
            "vercel" => "Vercel",
            "cloudinary" => "Cloudinary",
            "html" => "HTML",
            "css" => "CSS",
            "api" => "API",
            "restapi" => "REST API",
            _ => ToTitleCase(cleanValue)
        };
    }

    private static string ToTitleCase(string value)
    {
        var words = value
            .Trim()
            .Split(' ', StringSplitOptions.RemoveEmptyEntries);

        return string.Join(" ", words.Select(word =>
            word.Length == 1
                ? word.ToUpperInvariant()
                : char.ToUpperInvariant(word[0]) + word[1..].ToLowerInvariant()));
    }
}
