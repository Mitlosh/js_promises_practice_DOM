/* eslint-disable prefer-promise-reject-errors */ "use strict";
const notification = document.createElement("div");
notification.setAttribute("data-qa", "notification");
const firstPromise = new Promise((resolve, reject)=>{
    document.addEventListener("click", ()=>{
        resolve();
    });
    setTimeout(()=>{
        reject();
    }, 3000);
});
const secondPromise = new Promise((resolve)=>{
    const handleClick = ()=>{
        resolve("Second promise was resolved");
        document.removeEventListener("click", handleClick);
        document.removeEventListener("contextmenu", handleClick);
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", (e)=>{
        e.preventDefault();
        handleClick();
    });
});
const thirdPromise = new Promise((resolve)=>{
    let leftClicked = false;
    let rightClicked = false;
    document.addEventListener("mousedown", (e)=>{
        if (e.button === 0) leftClicked = true;
        if (e.button === 2) rightClicked = true;
        if (leftClicked && rightClicked) resolve("Third promise was resolved");
    });
});
firstPromise.then(()=>{
    notification.textContent = "First promise was resolved";
    notification.classList.add("success");
    document.body.appendChild(notification);
}).catch(()=>{
    notification.textContent = "First promise was rejected";
    notification.classList.add("error");
    document.body.appendChild(notification);
});
secondPromise.then(()=>{
    notification.textContent = "Second promise was resolved";
    notification.classList.add("success");
    document.body.appendChild(notification);
});
thirdPromise.then(()=>{
    notification.textContent = "Third promise was resolved";
    notification.classList.add("success");
    document.body.appendChild(notification);
});

//# sourceMappingURL=index.f75de5e1.js.map
