// Ad
Ad.join(Book, "bookId", "book", ["title", "author", "isbn"]);
Ad.join(Users, "createdBy", "user");

Users.join(University, "profile.universityId", "university");

