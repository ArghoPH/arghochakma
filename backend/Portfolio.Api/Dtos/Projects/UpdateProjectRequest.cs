namespace Portfolio.Api.Dtos.Projects;

public class UpdateProjectRequest
{
    public required string Title { get; set; }

    public required string Description { get; set; }

    public string? ImageUrl { get; set; }

    public string? LiveUrl { get; set; }

    public string? GithubUrl { get; set; }

    public List<string> TechStack { get; set; } = new();

    public bool IsFeatured { get; set; }
}
