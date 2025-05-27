const upload_input = document.querySelector("#upload-img");
const title_input = document.querySelector("#blog-title-input");
const article_input = document.querySelector("#article-input");
const submit_btn = document.querySelector(".action-button");
const overlay = document.querySelector(".overlay");
const overlay_text = document.querySelector(".overlay-message")



const home_btn = document.querySelector(".back-button");
const get_date = ()=> {
    const d = new Date();
    return d.toDateString();
}

// alert(get_date())

submit_btn.addEventListener("click", async (e) => {
    const title = title_input.value
    const article = article_input.value
    const img = upload_input.files
    // console.log(img)
    let flag = 0;
    

    if(title == "") flag = 1;
    if(article == "") flag = 2;
    if(img.length <= 0) flag = 3;
    if(flag == 1)
    {
        alert("write a title for your Blog")
    }
    if(flag == 2)
    {
        alert("write something about the title")
    }
    if(flag == 3)
    {
        alert("upload a picture")
    }

    if(!flag)
    {
        overlay.style.display = "flex";
        const data = new FormData();
        data.append("title", title)
        data.append("article", article)
        data.append("date", get_date() )
        data.append("file", img[0])
        data.append("image_name", img[0].name)
        

        // const urlencoded = new URLSearchParams(data).toString()
        const response = await fetch("/upload", {
            method: "POST",
            // headers: { 'Content-Type': 'multipart/form-data' },
            body: data
        })
        .catch((err) => {
            console.error("something went wrong, while uploading the form")
        })

        const res = await response.json()
        title_input.value = "";
        article_input.value = "";

        overlay.style.display = "none";
        // console.log(res)
    }


})


home_btn.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.assign("/")
})