namespace MultiShop.Basket.LoginServices
{
    /// <summary>
    /// Kullanıcı bilgilerini döndüren servis.
    /// </summary>
    public class LoginService : ILoginService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LoginService(IHttpContextAccessor contextAccessor)
        {
            _httpContextAccessor = contextAccessor;
        }

        public string GetUserId
        {
            get
            {
                var user = _httpContextAccessor.HttpContext?.User;
                if (user == null)
                {
                    throw new Exception("User context is not available");
                }

                var subClaim = user.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
                if (subClaim == null)
                {
                    throw new Exception("'sub' claim is not available");
                }

                return subClaim.Value;
            }
        }
    }
}