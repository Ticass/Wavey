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

function Friend:AddFriend(user_id, friend_id)
     -- Prevent the user from adding himself as a friend
     if user_id == friend_id then return nil end

     --unfriend the user if it's already friended
     local existing_friend = Friend:find({friend_id = friend_id, user_id = user_id})
     local existing_friend2 = Friend:find({friend_id = user_id, user_id = friend_id})
     if existing_friend and existing_friend2 then
         if Friend:IsUnFriended(friend_id, user_id) then
             existing_friend:update({unfriended = false})
             existing_friend2:update({unfriended = false})
             return {json = {message = "Re-friended friend"}}
         end
         return nil
     end
     -- User id is the user who added the person
     -- Friend ID is the person being added
     Friend:create({user_id = user_id, friend_id = friend_id})
     Friend:create({user_id = friend_id, friend_id = user_id})
end

function Friend:Unfriend(user_id, friend_id)
    -- Prevent the user from adding himself as a friend
    if user_id == friend_id then return nil end

    --unfriend the user if it's already friended
    local existing_friend = Friend:find({friend_id = friend_id, user_id = user_id})
    local existing_friend2 = Friend:find({friend_id = user_id, user_id = friend_id})
    if existing_friend and existing_friend2 then
        if not Friend:IsUnFriended(friend_id, user_id) then
            existing_friend:update({unfriended = true})
            existing_friend2:update({unfriended = true})
            return {json = {message = "unfriended friend"}}
        end

        return nil
    end

end


return Friend
