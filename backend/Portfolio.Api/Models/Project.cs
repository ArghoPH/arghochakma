namespace Portfolio.Api.Models;

public class Project
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public required string Title { get; set; }

    public required string Slug { get; set; }

    public required string Description { get; set; }

    public string? ImageUrl { get; set; }

    public List<string> GalleryImageUrls { get; set; } = new();

    public string? LiveUrl { get; set; }

    public string? GithubUrl { get; set; }

    public List<string> TechStack { get; set; } = new();

    public bool IsFeatured { get; set; }

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAtUtc { get; set; }
}
