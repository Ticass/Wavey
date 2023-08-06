local config = require("lapis.config")

config("development", {
  server = "nginx",
  code_cache = "off",
  num_workers = "1",
  static = "/static",


  -- Db setup
  postgres = {
    host = "127.0.0.1",
    port = 5432,
    user = "crybaby",
    password = "toor",
    database = "lapis"
  },

  port = 8080
})
