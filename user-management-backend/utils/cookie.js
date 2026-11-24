const refreshCookieOptions = {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
     secure: false, 
    sameSite: "lax",
    path: "/api/v1/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000
}

module.exports = { refreshCookieOptions };