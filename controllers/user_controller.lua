local User = require("models.user")

local UserController = {}


function UserController:Register()
    local params = self.params
    local plain_password = params.password
    local last_name = params.last_name
    local first_name = params.first_name
    local email = params.email

    User:create({
        first_name = first_name,
        last_name = last_name,
        email = email,
        password = User:encrypt_password(plain_password)
    })

   return { status = 200 }
end

function UserController:Login( )
    local params = self.params
    local plain_password = params.password
    local email = params.email
    local user_valid = User:verify_user(email, plain_password)

    if user_valid then
      return { status = 200 }
      else
        return {json = {text = "Not working wrong password"}}
      end
end

return UserController
