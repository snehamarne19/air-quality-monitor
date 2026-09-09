const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const btn = form.querySelector("button");
    btn.innerHTML = "Sending...";
    btn.disabled = true;

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        city: document.getElementById("city").value,
        inquiry: document.getElementById("inquiry").value,
        message: document.getElementById("message").value
    };

    try {

        const response = await fetch("http://localhost:3000/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)

        });

        const data = await response.json();

        if(data.success){

            const toast = document.getElementById("toast");

            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);

            form.reset();

        } else {

            alert("Failed To Send Message");

        }

    } catch(error){

        console.log(error);

        alert("Server Error");

    }

    btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    btn.disabled = false;

});