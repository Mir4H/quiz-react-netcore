using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Player
    {
        [Key]
        public int PlayerId { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Email { get; set; }

        public int Score { get; set; }

        public int FinishTime { get; set; }
    }

    public class PlayerResult
    {
        [Key]
        public int PlayerId { get; set; }

        public int Score { get; set; }

        public int FinishTime { get; set; }
    }
}
