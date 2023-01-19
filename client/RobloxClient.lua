print("Hello world!")

local HttpService = game:GetService("HttpService")

-- The server URL
local URL = "http://localhost:3000/"


local function doGet(userId)
	local response
	local data

	-- Use pcall in case something goes wrong
	pcall(function()
		response = HttpService:GetAsync(URL .. "userId=" .. userId)
		data = HttpService:JSONDecode(response)
	end)

	-- Did our request fail or our JSON fail to parse?
	if not data then
		return false
	end

	-- Fully check our data for validity. This is dependent on what endpoint you're
	-- to which you're sending your requests. For this example, this endpoint is
	-- described here:  http://open-notify.org/Open-Notify-API/ISS-Location-Now/
	if data.msg and data.val then
		print("Server says:")
		print(data.msg .. ", " .. data.val)
		return true
	end

	return false

end

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

game:GetService("Players").PlayerAdded:Connect(function(player)
	local userId = player.UserId
	print("USER!", userId)

	if doGet(userId) then
		print("Success")
	else
		print("Something went wrong")
	end
	
	doPost(userId)
end)
