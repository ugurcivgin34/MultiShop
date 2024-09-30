using Microsoft.EntityFrameworkCore;
using MultiShop.Comment.Entities;

namespace MultiShop.Comment.Context
{
    public class CommentContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;initial Catalog=MultiShopCommentDb;integrated Security=true;TrustServerCertificate=true");
        }
        public DbSet<UserComment> UserComments { get; set; }
    }
}
