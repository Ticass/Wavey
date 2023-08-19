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

function UserController:Login()
    local params = self.params
    local plain_password = params.password
    local email = params.email
    local user_valid = User:verify_user(email, plain_password)
    local user = User:find_by_email(email)

    if user_valid and user then
        self.session.current_user_id = user.id

      return {json = {text = "User stored in session: "..self.session.current_user_id}}
      else
        return {json = {text = "Not working wrong password"}}
      end
end

-- Return the current user for context API
function UserController:GetCurrentUser()
  local user_id = self.session.current_user_id
  if user_id == nil then return {json = {error = "error no user id found" }} end

  local user = User:find(user_id)
  return {json = {user = user}}
end


-- Get a user by ID for the front-end
function UserController:GetUser()
  local params = self.params
  local user_id = params.id
  local user = User:find(user_id)
  return {json = {user = user}}
end

return UserController
