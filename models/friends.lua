local Model = require("lapis.db.model").Model
local Friend = Model:extend("friends")

--Internal method to grab the friends
function Friend:FindAllFriendsByUserId(user_id)
    if not user_id then return end

    local Friends = Friend:select("where user_id = ? and unfriended = ?", user_id, false)

    return Friends
end

function Friend:IsUnFriended(friend_id, user_id)
    local friend = Friend:find({friend_id = user_id, user_id = friend_id})
    local friend2 = Friend:find({friend_id = friend_id, user_id = user_id})
    if not friend and not friend2 then return true end
    if user_id == friend_id then return "same" end
    if friend.unfriended and friend2.unfriended then return true else return false end
end


return Friend
