local Friend = require("models.friends")
local FriendRequest = require("models.friend_request")
local User = require("models.user")

local FriendController = {}

function FriendController:AddFriend()
    local params = self.params
    local user_id = self.session.current_user_id
    local friend_id = params.friend_id

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

    return {json = {message = "Friend added with Success"}}
end


function FriendController:Unfriend()
    local params = self.params
    local user_id = self.session.current_user_id
    local friend_id = params.friend_id

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
    if unfriended == true then return {json = {status = "Add Friend"}} elseif unfriended == false then return {json = {status = "Unfriend"}} end
end

--Friend Requests

function FriendController:SendFriendRequest()
    local params = self.params
    local user_id = self.session.current_user_id
    local friend_id = params.friend_id
    --Null Check
    if not user_id and not friend_id then return end

    -- Prevent user from requesting to himself
    if user_id == tonumber(friend_id) then return end

    local already_exists = FriendRequest:find({user_id = user_id, friend_id = tonumber(friend_id)})
    if already_exists then return {json = {message = "Already exists"}} end

    local request = FriendRequest:create({
        user_id = user_id,
        friend_id = tonumber(friend_id),
        Accepted = nil,
    })

    return {json = {request = request}}

end

function FriendController:GetAllFriendRequestsByUser()
    local user_id = self.session.current_user_id
    local requests = FriendRequest:select("where friend_id = ? order by id desc", user_id)
    local request_json = {}
    for _,v in pairs(requests) do
        local profile_picture = User:find(v.user_id).profile_picture
        local user_name = User:find(v.user_id).first_name
        if v.accepted ~= true or v.accepted ~= false then
            table.insert(request_json, {request = v, profile_picture = profile_picture, user_name = user_name })
        end
    end

    return {json = {requests = request_json}}
end

function FriendController:AcceptFriendRequest()
    local params = self.params
    local user_id = self.session.current_user_id
    local friend_id = params.friend_id

    local request = FriendRequest:find({user_id = user_id, friend_id = friend_id})
    if not request then return end

    FriendRequest:AcceptRequest(request.id)
end

function FriendController:DenyFriendRequest()
    local params = self.params
    local user_id = self.session.current_user_id
    local friend_id = params.friend_id

    local request = FriendRequest:find({user_id = user_id, friend_id = friend_id})
    if not request then return end

    FriendRequest:DenyRequest(request.id)
end





return FriendController
