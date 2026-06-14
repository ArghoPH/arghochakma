using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Portfolio.Api.Dtos.Auth;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("login")]
    public ActionResult<LoginResponse> Login(LoginRequest request)
    {
        var adminUsername = _configuration["Admin:Username"];
        var adminPassword = _configuration["Admin:Password"];

        if (request.Username != adminUsername || request.Password != adminPassword)
        {
            return Unauthorized(new { message = "Invalid username or password." });
        }

        var jwtKey = _configuration["Jwt:Key"];

        if (string.IsNullOrWhiteSpace(jwtKey))
        {
            return StatusCode(500, new { message = "JWT key is not configured." });
        }

        var issuer = _configuration["Jwt:Issuer"] ?? "Portfolio.Api";
        var audience = _configuration["Jwt:Audience"] ?? "Portfolio.Admin";
        var expiresAtUtc = DateTime.UtcNow.AddHours(8);

        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, request.Username),
            new(ClaimTypes.Role, "Admin")
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiresAtUtc,
            signingCredentials: credentials
        );

        return Ok(new LoginResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAtUtc = expiresAtUtc
        });
    }
}
