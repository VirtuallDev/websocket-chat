const params = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

window.onload = () => {
  let createNewChannelButton = document.querySelector("#create-new-channel");
  let channelDisplays = document.getElementById("channel-displays");
  let createChannelInputs = document.getElementById("create-channel-inputs");
  let setChannelButton = document.getElementById("set-channel");
  createChannelInputs.style.display = "none";
  setChannelButton.style.display = "none";

  socket.on("channelsLoaded", channels => {

    
    channels.forEach(channel => {
      console.log(channel)
      let channelDisplay = document.createElement("div");
      channelDisplay.className = "channel";
      channelDisplay.innerHTML = `<span>${channel.name}</span> <span>${channel.ownerName}</span> <span>${channel.currentUsers.length}/${channel.maxUsers}</span> <span class="span-btn">Enter</span>`;
      channelDisplays.innerHTML += channelDisplay.outerHTML;
    });
  });

  if(params.name)
    {
    document.querySelector(".header").innerHTML = `Welcome ${params.name}!`;
    createNewChannelButton.addEventListener("click", e => {
      channelDisplays.style.display = "none";
      createChannelInputs.style.display = "block";
      createNewChannelButton.style.display = "none";
      setChannelButton.style.display = "block";
    })
    setChannelButton.addEventListener("click", e => {
      if(setChannelButton.style.display == "none") return;
      let channelName = document.getElementById("channel-name").value;
      let channelMemberLimit = document.getElementById("channel-member-limit").value;
      const channel = {
        name: channelName,
        currentUsers: [],
        ownerName: params.name,
        maxUsers: channelMemberLimit | 12,
      }

      socket.emit("channelCreation", channel);

      createChannelInputs.style.display = "none";
      setChannelButton.style.display = "none";
      channelDisplays.style.display = "block";
      createNewChannelButton.style.display = "block";
    })  
  }
  else {
    document.querySelector(".header").innerHTML = `You are not authenticated!`;
    channelDisplays.style.display = "none";
    createNewChannelButton.style.display = "none";
  }

}

