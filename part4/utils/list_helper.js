const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const mostLiked = blogs.reduce((iMax, n, i, blogs) => n.likes > blogs[iMax].likes ? i : iMax, 0)

    return blogs[mostLiked]
}

module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog
}