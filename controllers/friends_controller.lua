local Friend = require("models.friends")
local FriendRequest = require("models.friend_request")
local User = require("models.user")

local FriendController = {}

function FriendController:AddFriend()
    local params = self.params
    local user_id = self.session.current_user_id
    local friend_id = params.friend_id

    Friend:AddFriend(user_id, friend_id)

    return {json = {message = "Friend added with Success"}}
end


function FriendController:Unfriend()
    local params = self.params
    local user_id = self.session.current_user_id
    local friend_id = params.friend_id

    Friend:Unfriend(user_id, friend_id)

    return {json = {message = "Friend added with Success"}}
end


function FriendController:DisplayFriends()
    local params = self.params
    local user_id = params.user_id
    local user = User:find(user_id)
    local friends = Friend:FindAllFriendsByUserId(user_id)
    if not friends then return end
    local data = {}

    for _,v in pairs(friends) do
        local friend = User:find(v.friend_id)
        local status = nil

        if v.unfriended then status = "Add Friend" end
        if not v.unfriended then status = "Unfriend" end
        if not friend then return end
        table.insert(data, {user_id = user_id, friend_id = v.friend_id, profile_picture = friend.profile_picture, name = friend.first_name, status = status })
    end

    return {json = {friends = data}}
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
    if already_exists and already_exists.accepted ~= true and already_exists.accepted ~= false then return {json = {message = "Already exists"}} end

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
        if v.accepted ~= true and v.accepted ~= false then
            table.insert(request_json, {request = v, profile_picture = profile_picture, user_name = user_name })
        end
    end

    return {json = {requests = request_json}}
end

function FriendController:AcceptFriendRequest()
    local params = self.params
    local user_id = self.session.current_user_id
    local friend_id = params.friend_id

    local request = FriendRequest:find({user_id = friend_id, friend_id = user_id})
    if not request then return end

    FriendRequest:AcceptRequest(request.id)
    return {json = {message = "Accepted Friend Request"}}

end

function FriendController:DenyFriendRequest()
    local params = self.params
    local user_id = self.session.current_user_id
    local friend_id = params.friend_id

    local request = FriendRequest:find({user_id = friend_id, friend_id = user_id})
    if not request then return end

    FriendRequest:DenyRequest(request.id)
    return {json = {message = "Denied Friend Request"}}
end





return FriendController
