const create_btn = document.querySelector(".create-blog-button");
const blog_cont = document.querySelector(".blogs");
create_btn.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.assign("/create")
})


async function fetch_blog()
{
    const response = await fetch("/get-blog", {
        method: "GET"
    })
    .catch((err) => {
        console.log("something went wrong while fetching blog data")
    })


    const data = await response.json()
    return data
}




function blog_DOM(blog_data)
{
    return (`
         <div class="blog" objectId = '${blog_data._id}'>
        <div class="detail">
        <p class="blog-title">${blog_data.title}</p>
        <p class="blog-date">${blog_data.date}</p>
    </div>
    
    <div class="blog-img-wrapper">
        <img class="blog-img" src="/public/uploads/${blog_data.image_name}" height="150px">
    </div>
</div>
    `);
} 

fetch_blog().then(async (data) => {
    blog_cont.innerHTML = "";

    console.log(data.data)
    if(data.length == 0)
    {
        blog_cont.innerHTML = "no blog found";
    } else {
        await data.data.map((blog) => {
            blog_cont.innerHTML += blog_DOM(blog)
        })

        const blogs = document.querySelectorAll('.blog');
    // console.log(blogs)
    blogs.forEach((blog) => {

    // console.log(blog)
    blog.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.assign(`/blog/${blog.getAttribute('objectId')}`)
    })
})
    }
})


