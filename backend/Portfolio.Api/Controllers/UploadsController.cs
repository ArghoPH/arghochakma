using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Dtos.Uploads;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadsController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public UploadsController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [Authorize]
    [HttpPost("image")]
    [RequestSizeLimit(5 * 1024 * 1024)]
    public async Task<ActionResult<UploadImageResponse>> UploadImage(IFormFile file)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest(new { message = "Image file is required." });
        }

        var allowedContentTypes = new[]
        {
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif"
        };

        if (!allowedContentTypes.Contains(file.ContentType))
        {
            return BadRequest(new { message = "Only JPG, PNG, WEBP, and GIF images are allowed." });
        }

        var cloudName = _configuration["Cloudinary:CloudName"];
        var apiKey = _configuration["Cloudinary:ApiKey"];
        var apiSecret = _configuration["Cloudinary:ApiSecret"];

        if (
            string.IsNullOrWhiteSpace(cloudName) ||
            string.IsNullOrWhiteSpace(apiKey) ||
            string.IsNullOrWhiteSpace(apiSecret)
        )
        {
            return StatusCode(500, new { message = "Cloudinary settings are not configured." });
        }

        var account = new Account(cloudName, apiKey, apiSecret);
        var cloudinary = new Cloudinary(account);

        await using var stream = file.OpenReadStream();

        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Folder = "portfolio-projects",
            UseFilename = true,
            UniqueFilename = true,
            Overwrite = false
        };

        var uploadResult = await cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error is not null)
        {
            return StatusCode(500, new { message = uploadResult.Error.Message });
        }

        if (uploadResult.SecureUrl is null)
        {
            return StatusCode(500, new { message = "Image upload failed." });
        }

        return Ok(new UploadImageResponse
        {
            ImageUrl = uploadResult.SecureUrl.ToString(),
            PublicId = uploadResult.PublicId
        });
    }
}
