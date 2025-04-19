﻿namespace PhanThanhTuan_2122110123.Model
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserCreateAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
