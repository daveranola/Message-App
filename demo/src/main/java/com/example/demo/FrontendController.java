package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    // Matches any path without a dot (e.g., /dashboard, /profile)
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String forward() {
        // Forward everything back to index.html so React Router can handle it
        return "forward:/index.html";
    }
}
