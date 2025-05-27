const home_btn = document.querySelector(".home-btn");

home_btn.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.assign("/")
})



const url = window.location.href
const params = url.split("/")


const id = params[params.length-1]


async function get_blog_data(id)
{
    const response = await fetch('/get-blog-data', {
        method :'POST',
        headers: {
            "Content-Type": "application/json",
            
        },

        body: JSON.stringify({id})
    })
    .catch((err) => {
        console.log(err)
    })


    const data = await response.json()
    return data
}


async function main() {
    const response = await get_blog_data(id)
    const blogImg = document.querySelector('.blog-img');
    const title = document.querySelector('.title')
    const article = document.querySelector('.article')
    const data = response.data
    blogImg.src = `/public/uploads/${data.image_name}`
    title.innerHTML = data.title
    article.innerHTML = data.article

}

main()