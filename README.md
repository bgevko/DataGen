# DataGen
DataGen is an open-source random data generator. Many very well-built random data generators already exist, so why did I build my own? Because I thought that I could improve the design to suit my workflow specifically. 

## Intended use
The primary purpose of this tool is to open the web page and immediately have JSON data that you can copy directly into your IDE. There are some options for customizability, but the primary goal of the design is to keep the user's focus on the coding task. It's meant to be used as a side tab in the browser, where you switch to it for a few seconds, hit copy, then paste the data into the IDE. 


# DevLog

### Dec 4, 2022
I designed the UI in Figma. I tried my best to design from the end-experience; that is, focusing on the following priorities:
1. Convenience and usability
2. Expandability
3. UI clarity and "beauty"

Here are the first drafts for Desktop, phone portrait, and phone landscape screens.

---
#### Desktop
<img src="https://github.com/bgevko/DataGen/blob/main/readme-img/desktop.png" width=50%>

---
#### Mobile Portrait
<img src="https://github.com/bgevko/DataGen/blob/main/readme-img/phone2.png" width=20%>

---
#### Mobile Landscape
<img src="https://github.com/bgevko/DataGen/blob/main/readme-img/phone1.png" width=50%>

---


People don't develop on mobile ([or do they?](https://9to5mac.com/2021/06/07/ipados-15-you-can-now-build-apps-on-the-ipad-and-ship-to-the-app-store/)), so why am I making a design for the mobile screen? Although I have no intention of anyone using this on their phone, I want the layout to be responsive and look good on all screen sizes. Also, if you want to use this on your mobile screen for some reason, it should be as easy to use as on the desktop (in theory). 

Of course, this is not a comprehensive design. I do not yet know what limitations I will run into when I begin implementing it, but it is a good starting point. 
