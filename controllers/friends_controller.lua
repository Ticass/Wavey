local Friend = require("models.friends")

local FriendController = {}

function FriendController:AddFriend()
    local params = self.params
    local user_id = self.session.current_user_id
    local friend_id = params.friend_id

    -- Prevent the user from adding himself as a friend
    if user_id == friend_id then return {json = {error = "error, you can't add yourself as a friend !"}} end

    --unfriend the user if it's already friended
    local existing_friend = Friend:find({friend_id = friend_id, user_id = user_id})
    local existing_friend2 = Friend:find({friend_id = user_id, user_id = friend_id})
    if existing_friend then
        if Friend:IsUnFriended(friend_id, user_id) then
            existing_friend:update({unfriended = false})
            existing_friend2:update({unfriended = false})
            return {json = {message = "Re-friended friend"}}
        end

        if not Friend:IsUnFriended(friend_id, user_id) then
            existing_friend:update({unfriended = true})
            existing_friend2:update({unfriended = true})
            return {json = {message = "unfriended friend"}}
        end

        return nil
    end
    -- User id is the user who added the person
    -- Friend ID is the person being added
    Friend:create({user_id = user_id, friend_id = friend_id})
    Friend:create({user_id = friend_id, friend_id = user_id})

    return {json = {message = "Friend added with Success"}}
end

function FriendController:DisplayFriends()
    local params = self.params
    local user_id = params.user_id

    local friends = Friend:FindAllFriendsByUserId(user_id)

    return {json = {friends = friends}}
end

function FriendController:Status()
    local params = self.params
    local user_id = params.user_id
    local friend_id = params.friend_id

    local unfriended = Friend:IsUnFriended(friend_id, user_id)
    if unfriended == "same" then return {json = {status = "Not Available"}} end
    if unfriended then return {json = {status = "Add Friend"}} else return {json = {status = "Unfriend"}} end
end

return FriendController
