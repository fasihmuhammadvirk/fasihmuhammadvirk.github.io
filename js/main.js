(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $(".navbar").fadeIn("slow").css("display", "flex");
        } else {
            $(".navbar").fadeOut("slow").css("display", "none");
        }
    });

    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $("html, body").animate(
                {
                    scrollTop: $(this.hash).offset().top - 45,
                },
                1500,
                "easeInOutExpo"
            );

            if ($(this).parents(".navbar-nav").length) {
                $(".navbar-nav .active").removeClass("active");
                $(this).closest("a").addClass("active");
            }
        }
    });

    // Typed Initiate
    if ($(".typed-text-output").length === 1) {
        var typed_strings = $(".typed-text").text();
        new Typed(".typed-text-output", {
            strings: typed_strings.split(", "),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true,
        });
    }

    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".scroll-to-bottom").fadeOut("slow");
        } else {
            $(".scroll-to-bottom").fadeIn("slow");
        }
    });

    // Skills
    $(".skill").waypoint(
        function () {
            $(".progress .progress-bar").each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + "%");
            });
        },
        { offset: "80%" }
    );

    // Portfolio isotope and filter
    var portfolioIsotope = $(".portfolio-container").isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
    });
    $("#portfolio-flters li").on("click", function () {
        $("#portfolio-flters li").removeClass("active");
        $(this).addClass("active");

        portfolioIsotope.isotope({ filter: $(this).data("filter") });
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    $(".back-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
        return false;
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1,
    });

    // Initialize EmailJS
    emailjs.init("EN_t3h0_EERtWtqKu"); // Replace with your actual public key

    // Contact Form Submission
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Collect form data
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate form data
        if (!name || !email || !subject || !message) {
            showMessage("All fields are required.", "red");
            return;
        }

        // EmailJS template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
        };

        // Send email using EmailJS
        emailjs
            .send("service_x1lw3jq", "template_fr91amg", templateParams)
            .then(() => {
                showMessage("Your message has been sent successfully!", "green");
                document.getElementById("contactForm").reset(); // Reset the form
            })
            .catch((error) => {
                console.error("EmailJS Error:", error); // Log error for debugging
                showMessage("Failed to send your message. Please try again later.", "red");
            });
    });

    // Function to display confirmation/error messages
    function showMessage(message, color) {
        const confirmationMessage = document.getElementById("confirmationMessage");
        confirmationMessage.style.display = "block";
        confirmationMessage.style.color = color;
        confirmationMessage.innerText = message;

        // Automatically hide the message after 5 seconds
        setTimeout(() => {
            confirmationMessage.style.display = "none";
        }, 5000);
    }
})(jQuery);

// Function to display confirmation/error messages
function showMessage(message, color) {
    const confirmationMessage = document.getElementById("confirmationMessage");

    if (!confirmationMessage) {
        console.error("Confirmation message element not found!");
        return;
    }

    confirmationMessage.style.display = "block";
    confirmationMessage.style.color = color;
    confirmationMessage.innerText = message;

    // Automatically hide the message after 5 seconds
    setTimeout(() => {
        confirmationMessage.style.display = "none";
    }, 5000);
}
