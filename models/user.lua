local Model = require("lapis.db.model").Model
local User = Model:extend("users") -- 'users' is the name of your table in the database
local bcrypt = require "bcrypt"

  function User:encrypt_password(plain_password)
      return bcrypt.digest(plain_password, 12) -- Cost Factor
    end

    function User:verify_password(plain_password, hashed_password)
      return bcrypt.verify(plain_password, hashed_password)
    end

  function User:find_by_email(email)
    local user = User:find({email = email})
    if user == nil then return end

    return user
  end

  function User:verify_user(email, password)
      local user = User:find_by_email(email)
      if user == nil then return end

      local user_hashed_password = user.password
      local password_valid = User:verify_password(password, user_hashed_password)

      return password_valid
  end



return User
