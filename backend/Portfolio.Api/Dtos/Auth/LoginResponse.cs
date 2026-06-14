namespace Portfolio.Api.Dtos.Auth;

public class LoginResponse
{
    public required string Token { get; set; }

    public DateTime ExpiresAtUtc { get; set; }
}
