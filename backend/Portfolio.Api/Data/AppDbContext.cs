using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects => Set<Project>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(project => project.Id);

            entity.HasIndex(project => project.Slug)
                .IsUnique();

            entity.Property(project => project.Title)
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(project => project.Slug)
                .HasMaxLength(180)
                .IsRequired();

            entity.Property(project => project.Description)
                .HasMaxLength(1000)
                .IsRequired();

            entity.Property(project => project.ImageUrl)
                .HasMaxLength(500);

            entity.Property(project => project.LiveUrl)
                .HasMaxLength(500);

            entity.Property(project => project.GithubUrl)
                .HasMaxLength(500);
        });
    }
}
