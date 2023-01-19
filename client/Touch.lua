print("Hello Touch!")
local part = workspace.Part
local PlayerService = game:GetService("Players")

local HttpService = game:GetService("HttpService")

-- The server URL
local URL = "http://localhost:3000/"

local function doPost(userId)
	local dataFields = {
		["userId"] = userId,
	}

	local data = ""
	for k, v in pairs(dataFields) do
		data = data .. ("&%s=%s"):format(HttpService:UrlEncode(k), HttpService:UrlEncode(v))
	end
	data = data:sub(2) -- Remove the first &

	-- Here's the data we're sending
	print(data)

	-- Make the request
	local response = HttpService:PostAsync(URL, data, Enum.HttpContentType.ApplicationUrlEncoded, false)

	-- The response will be the URL to the new paste (or an error string if something was wrong)
	print(response)
end

local function onTouched(hit)
	print(part.Name .. " collided with " .. hit.Name)
	local player = game.Players:GetPlayerFromCharacter(hit.Parent)
	print(player.Name)
	local userId = PlayerService:GetUserIdFromNameAsync(player.Name)
	doPost(userId)
end

part.Touched:Connect(onTouched)

