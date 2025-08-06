export default {
    async fetch(request) {
        const allowedDomains = ['shreedembla.com', 'app.swipepages.com'];
        const origin = request.headers.get('Origin') || request.headers.get('Referer');

        if (origin) {
            const originHostname = new URL(origin).hostname;
            const isAllowed = allowedDomains.some(domain => originHostname.endsWith(domain));

            if (isAllowed) {
                return new Response(
                    `
                    document.addEventListener("DOMContentLoaded", function() {
                        // User details variables
                        let userCity = "Unknown";
                        let userIp = "Unknown";
                        let userTimezone = "Unknown";
                        const submitBtn = document.querySelector('.tatsu-form-submit');
                        const form = document.querySelector('.tatsu-form'); // Get the form element

                        // Fetch user details
                        function fetchUserDetails() {
                            fetch('https://ipapi.co/json/')
                                .then(response => response.json())
                                .then(data => {
                                    userCity = data.city || "Unknown";
                                    userIp = data.ip || "Unknown";
                                    userTimezone = data.timezone || "Unknown";
                                    console.log('[DEBUG] User Details Fetched:', { userCity, userIp, userTimezone });
                                })
                                .catch(error => console.error('[DEBUG] Error fetching user details:', error));
                        }
                        fetchUserDetails();

                        // Get URL query parameters
                        function getQueryParams() {
                            const params = new URLSearchParams(window.location.search);
                            const queryParams = {
                                fbclid: params.get('fbclid') || '',
                                gclid: params.get('gclid') || '', // Added gclid
                                utm_source: params.get('utm_source') || '',
                                utm_medium: params.get('utm_medium') || '',
                                utm_campaign: params.get('utm_campaign') || '',
                                utm_term: params.get('utm_term') || '',
                                utm_content: params.get('utm_content') || ''
                            };
                            console.log('[DEBUG] URL Query Parameters:', queryParams);
                            return queryParams;
                        }

                        // Enhanced processing state with perfect text alignment
                        function showProcessingState() {
                            if (submitBtn) {
                                submitBtn.style.cssText = \`
                                    pointer-events: none;
                                    border: none;
                                    border-radius: 50px;
                                    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                                    color: white;
                                    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.5);
                                    overflow: hidden;
                                    position: relative;
                                    padding: 0 20px;
                                    white-space: nowrap;
                                    height: 60px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-weight: 600;
                                    font-size: clamp(14px, 3.5vw, 16px);
                                \`;
                                
                                submitBtn.innerHTML = \`
                                    <div style="
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        width: 100%;
                                        position: relative;
                                        gap: 8px;
                                    ">
                                        <span style="
                                            display: inline-block;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                            text-align: center;
                                            flex: 1;
                                            padding: 0 30px 0 0;
                                        ">Finishing Registration • Unlocking Bonuses</span>
                                        <div class="loading-dots" style="
                                            position: absolute;
                                            right: 15px;
                                            display: flex;
                                            gap: 5px;
                                        ">
                                            <div style="
                                                width: 8px;
                                                height: 8px;
                                                border-radius: 50%;
                                                background: white;
                                                animation: dotPulse 1.4s infinite ease-in-out;
                                                animation-delay: 0.2s;
                                            "></div>
                                            <div style="
                                                width: 8px;
                                                height: 8px;
                                                border-radius: 50%;
                                                background: white;
                                                animation: dotPulse 1.4s infinite ease-in-out;
                                                animation-delay: 0.4s;
                                            "></div>
                                            <div style="
                                                width: 8px;
                                                height: 8px;
                                                border-radius: 50%;
                                                background: white;
                                                animation: dotPulse 1.4s infinite ease-in-out;
                                                animation-delay: 0.6s;
                                            "></div>
                                        </div>
                                    </div>
                                    <style>
                                        @keyframes dotPulse {
                                            0%, 60%, 100% { transform: scale(0.8); opacity: 0.5; }
                                            30% { transform: scale(1.1); opacity: 1; }
                                        }
                                    </style>
                                \`;
                            }
                        }

                        function resetSubmitButton() {
                            if (submitBtn) {
                                submitBtn.style.cssText = '';
                                submitBtn.textContent = 'Submit';
                                submitBtn.style.pointerEvents = 'auto';
                                submitBtn.style.opacity = '1';
                            }
                        }

                        // API call functions
                        async function registerAndCheckoutOtpless(name, email, phone) {
                            try {
                                console.log('[DEBUG] Calling registerAndCheckoutOtpless with:', { name, email, phone });
                                const response = await fetch("https://referral-testing-sp-lp.connect-17d.workers.dev/", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ name, email, phone }),
                                });
                                if (!response.ok) {
                                    const errorText = await response.text();
                                    throw new Error("Registration failed: " + response.status + " - " + errorText);
                                }
                                const data = await response.json();
                                console.log('[DEBUG] registerAndCheckoutOtpless Response:', data);
                                return data.result;
                            } catch (error) {
                                console.error('[DEBUG] Registration error:', error);
                                throw error;
                            }
                        }

                        async function completeSubscriptionPurchase(orderId) {
                            try {
                                console.log('[DEBUG] Calling completeSubscriptionPurchase with Order ID:', orderId);
                                const response = await fetch("https://api-prod-new.tagmango.com/v2/complete-subscription-purchase", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ orderId, coupon: "zero_cost" }),
                                });
                                if (!response.ok) {
                                    const errorText = await response.text();
                                    throw new Error("Purchase failed: " + response.status + " - " + errorText);
                                }
                                const data = await response.json();
                                console.log('[DEBUG] completeSubscriptionPurchase Response:', data);
                                return data.result;
                            } catch (error) {
                                console.error('[DEBUG] Purchase error:', error);
                                throw error;
                            }
                        }

                        async function createRetargetKitLink(TMid) {
                            try {
                                console.log('[DEBUG] Calling createRetargetKitLink with TMid:', TMid);
                                const response = await fetch("https://create-retargetkit-link.connect-17d.workers.dev/", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ TMid }),
                                });
                                if (!response.ok) {
                                    const errorText = await response.text();
                                    throw new Error("Link creation failed: " + response.status + " - " + errorText);
                                }
                                const data = await response.json();
                                console.log('[DEBUG] createRetargetKitLink Response:', data);
                                return data;
                            } catch (error) {
                                console.error('[DEBUG] Link creation error:', error);
                                throw error;
                            }
                        }

                        // Original Webhook (for general/other LeadSource)
                        async function sendWebhookData(TMid, shortLink, slug, name, email, phone) {
                            try {
                                const queryParams = getQueryParams();
                                const leadSource = document.querySelector('input[name="Lead-Source_sp"]')?.value.trim() || "Unknown";
                                const payload = {
                                    FullName: name,
                                    Email: email,
                                    Phone: '+91' + phone, // Corrected: Using string concatenation
                                    TMid,
                                    Status: "Approved",
                                    LeadSource: leadSource,
                                    ClidType: "Unknown", // Default for general
                                    Fbclid: queryParams.fbclid,
                                    UtmSource: queryParams.utm_source,
                                    UtmMedium: queryParams.utm_medium,
                                    UtmCampaign: queryParams.utm_campaign,
                                    UtmTerm: queryParams.utm_term,
                                    UtmContent: queryParams.utm_content,
                                    Timezone: userTimezone,
                                    Ip: userIp,
                                    Date: new Date().toString(),
                                    City: userCity,
                                    shortLink,
                                    slug
                                };
                                console.log('[DEBUG] Sending Webhook Data (General):', payload);
                                await fetch("https://webhook.site/22e483a7-bd2c-4696-ac3a-bed6c1abe70a", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(payload),
                                });
                                console.log('[DEBUG] Webhook Data (General) sent successfully.');
                            } catch (error) {
                                console.error('[DEBUG] Webhook error (General):', error);
                                throw error;
                            }
                        }

                        // Webhook for Google LeadSource
                        async function sendWebhookDataGoogle(TMid, shortLink, slug, name, email, phone) {
                            try {
                                const queryParams = getQueryParams();
                                const leadSource = document.querySelector('input[name="Lead-Source_sp"]')?.value.trim() || "Google";
                                const payload = {
                                    FullName: name,
                                    Email: email,
                                    Phone: '+91' + phone, // Corrected: Using string concatenation
                                    TMid,
                                    Status: "Approved",
                                    LeadSource: leadSource,
                                    ClidType: "gclid",
                                    Fbclid: queryParams.gclid, // Using gclid here
                                    UtmSource: queryParams.utm_source,
                                    UtmMedium: queryParams.utm_medium,
                                    UtmCampaign: queryParams.utm_campaign,
                                    UtmTerm: queryParams.utm_term,
                                    UtmContent: queryParams.utm_content,
                                    Timezone: userTimezone,
                                    Ip: userIp,
                                    Date: new Date().toString(),
                                    City: userCity,
                                    shortLink,
                                    slug
                                };
                                console.log('[DEBUG] Sending Webhook Data (Google):', payload);
                                await fetch("https://webhook.site/22e483a7-bd2c-4696-ac3a-bed6c1abe70a", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(payload),
                                });
                                console.log('[DEBUG] Webhook Data (Google) sent successfully.');
                            } catch (error) {
                                console.error('[DEBUG] Webhook error (Google):', error);
                                throw error;
                            }
                        }

                        // Webhook for Facebook LeadSource
                        async function sendWebhookDataFacebook(TMid, shortLink, slug, name, email, phone) {
                            try {
                                const queryParams = getQueryParams();
                                const leadSource = document.querySelector('input[name="Lead-Source_sp"]')?.value.trim() || "Facebook";
                                const payload = {
                                    FullName: name,
                                    Email: email,
                                    Phone: '+91' + phone, // Corrected: Using string concatenation
                                    TMid,
                                    Status: "Approved",
                                    LeadSource: leadSource,
                                    ClidType: "fbclid",
                                    Fbclid: queryParams.fbclid,
                                    UtmSource: queryParams.utm_source,
                                    UtmMedium: queryParams.utm_medium,
                                    UtmCampaign: queryParams.utm_campaign,
                                    UtmTerm: queryParams.utm_term,
                                    UtmContent: queryParams.utm_content,
                                    Timezone: userTimezone,
                                    Ip: userIp,
                                    Date: new Date().toString(),
                                    City: userCity,
                                    shortLink,
                                    slug
                                };
                                console.log('[DEBUG] Sending Webhook Data (Facebook):', payload);
                                await fetch("https://webhook.site/22e483a7-bd2c-4696-ac3a-bed6c1abe70a", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(payload),
                                });
                                console.log('[DEBUG] Webhook Data (Facebook) sent successfully.');
                            } catch (error) {
                                console.error('[DEBUG] Webhook error (Facebook):', error);
                                throw error;
                            }
                        }

                        // Fallback redirect function (with query parameters)
                        function redirectToFallback(initialUrlQueryParams) {
                            const params = new URLSearchParams(initialUrlQueryParams);
                            const fallbackUrl = 'https://aoe.shreedembla.com/oto-page-1?' + params.toString(); // Corrected: Using string concatenation
                            console.log('[DEBUG] Redirecting to fallback URL with query params:', fallbackUrl);
                            window.location.href = fallbackUrl;
                        }


                        // Form submission handler
                        async function handleFormSubmission() {
                            console.log('[DEBUG] Starting form submission');
                            
                            const name = document.querySelector('input[name="name_sp"]')?.value.trim();
                            const email = document.querySelector('input[name="email_sp"]')?.value.trim();
                            const phone = document.querySelector('input[name="phone_sp"]')?.value.trim();
                            const leadSourceInput = document.querySelector('input[name="Lead-Source_sp"]');
                            const leadSource = leadSourceInput ? leadSourceInput.value.trim() : ""; // Safely get leadSource
                            
                            // Capture initial URL query parameters for potential fallback
                            const initialUrlQueryParams = window.location.search;

                            console.log('[DEBUG] Form values:', { name, email, phone, leadSource });

                            if (!name || !email || !phone) {
                                console.error('[DEBUG] Validation failed: Missing required fields');
                                alert("Please fill all required fields");
                                return;
                            }
                            
                            if (!/^\\d{10}$/.test(phone)) {
                                console.error('[DEBUG] Validation failed: Invalid phone format');
                                alert("Please enter a valid 10-digit phone number");
                                return;
                            }
                            
                            showProcessingState();
                            
                            try {
                                console.log('[DEBUG] Attempting registration with Otpless...');
                                const registerResponse = await registerAndCheckoutOtpless(name, email, phone);
                                
                                if (!registerResponse?.fan || !registerResponse?._id) {
                                    console.error('[DEBUG] Registration response invalid (missing fan ID or order ID). Redirecting to fallback URL.');
                                    redirectToFallback(initialUrlQueryParams); // Use the new fallback function
                                    return; // Stop further execution
                                }
                                
                                const TMid = registerResponse.fan;
                                const orderId = registerResponse._id;
                                console.log('[DEBUG] Registration successful. TMid:', TMid, 'Order ID:', orderId);
                                
                                console.log('[DEBUG] Completing subscription purchase...');
                                await completeSubscriptionPurchase(orderId);
                                
                                console.log('[DEBUG] Creating retarget kit link...');
                                const shortLinkData = await createRetargetKitLink(TMid);
                                
                                if (!shortLinkData?.shortLink || !shortLinkData?.slug) {
                                    console.error('[DEBUG] RetargetKit link data invalid (missing shortLink or slug). Redirecting to fallback URL.');
                                    redirectToFallback(initialUrlQueryParams); // Use the new fallback function
                                    return; // Stop further execution
                                }

                                console.log('[DEBUG] RetargetKit Link Data:', shortLinkData);
                                
                                console.log('[DEBUG] Lead Source:', leadSource);
                                console.log('[DEBUG] Selecting webhook endpoint...');
                                
                                // Conditional Webhook Send
                                if (leadSource === "Google") {
                                    console.log('[DEBUG] Using Google webhook');
                                    await sendWebhookDataGoogle(TMid, shortLinkData?.shortLink, shortLinkData?.slug, name, email, phone);
                                } else if (leadSource === "Facebook") {
                                    console.log('[DEBUG] Using Facebook webhook');
                                    await sendWebhookDataFacebook(TMid, shortLinkData?.shortLink, shortLinkData?.slug, name, email, phone);
                                } else {
                                    console.log('[DEBUG] Using general webhook');
                                    await sendWebhookData(TMid, shortLinkData?.shortLink, shortLinkData?.slug, name, email, phone);
                                }
                                
                                console.log('[DEBUG] Starting redirect countdown...');
                                showRedirectCountdown(TMid, shortLinkData?.shortLink, shortLinkData?.slug, name, email, phone, leadSource);
                            } catch (error) {
                                console.error('[DEBUG] Form submission error caught:', error);
                                resetSubmitButton();
                                // Fallback redirect on any unhandled error during the process
                                console.log('[DEBUG] Unhandled error during submission. Redirecting to fallback URL.');
                                redirectToFallback(initialUrlQueryParams); // Use the new fallback function
                                // alert("Error processing your request. Please try again."); // Removed alert as it might block redirect
                            }
                        }

                        // Redirect countdown
                        function showRedirectCountdown(TMid, shortLink, slug, name, email, phone, leadSource) {
                            console.log('[DEBUG] Initializing countdown with Lead Source:', leadSource);
                            submitBtn.style.display = "none";
                            
                            const countdownEl = document.createElement('div');
                            countdownEl.style.cssText = \`
                                width: 100%;
                                height: 60px;
                                border-radius: 50px;
                                background: linear-gradient(90deg, #10b981, #3b82f6);
                                box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                position: relative;
                                overflow: hidden;
                            \`;
                            
                            countdownEl.innerHTML = \`
                                <div style="font-size: 16px; font-weight: 600; margin-bottom: 2px; z-index: 2;">
                                    Redirecting in <span id="countdown-number">4</span> seconds...
                                </div>
                                <div style="font-size: 13px; opacity: 0.9; z-index: 2;">
                                    🎁 Unlocking Bonuses Worth ₹4999 🎁
                                </div>
                                <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: rgba(255,255,255,0.2);">
                                    <div id="countdown-progress" style="height: 100%; width: 0%; background: white; transition: width 1s linear;"></div>
                                </div>
                            \`;
                            
                            submitBtn.parentNode.insertAdjacentElement('afterend', countdownEl);
                            
                            let countdown = 4;
                            const interval = setInterval(() => {
                                countdown--;
                                document.getElementById('countdown-number').textContent = countdown;
                                document.getElementById('countdown-progress').style.width = \`\${(4 - countdown) * 25}%\`;
                                
                                if (countdown <= 0) {
                                    clearInterval(interval);
                                    console.log('[DEBUG] Countdown complete - Lead Source:', leadSource);
                                    
                                    if (leadSource === "Google") {
                                        console.log('[DEBUG] Redirecting to Google TY page');
                                        redirectToThankYouPageGoogle(TMid, shortLink, slug, name, email, phone);
                                    } else if (leadSource === "Facebook") {
                                        console.log('[DEBUG] Redirecting to Facebook TY page');
                                        redirectToThankYouPageFacebook(TMid, shortLink, slug, name, email, phone);
                                    } else {
                                        console.log('[DEBUG] Redirecting to general TY page');
                                        redirectToThankYouPage(TMid, shortLink, slug, name, email, phone);
                                    }
                                }
                            }, 1000);
                        }

                        function redirectToThankYouPage(TMid, shortLink, slug, name, email, phone) {
                            console.log('[DEBUG] General redirect triggered');
                            const queryParams = getQueryParams();
                            const wStartDate = document.querySelector('.wStartDate')?.textContent.trim() || "";
                            const wStartTime = document.querySelector('.wStartTime')?.textContent.trim() || "";
                            const leadSource = document.querySelector('input[name="Lead-Source_sp"]')?.value.trim() || "Unknown";
                            
                            // Corrected: Using string concatenation for URL construction
                            const redirectUrl = 'https://aoe.shreedembla.com/ty-testing-non-otp?FullName=' + encodeURIComponent(name) +
                                '&Email=' + encodeURIComponent(email) +
                                '&Phone=' + encodeURIComponent(phone) +
                                '&Lead-Source=' + encodeURIComponent(leadSource) +
                                '&Clid-Type=Unknown&fbclid=' + encodeURIComponent(queryParams.fbclid) +
                                '&Utm%20Source=' + encodeURIComponent(queryParams.utm_source) +
                                '&Utm%20Medium=' + encodeURIComponent(queryParams.utm_medium) +
                                '&Utm%20Campaign=' + encodeURIComponent(queryParams.utm_campaign) +
                                '&Utm%20Term=' + encodeURIComponent(queryParams.utm_term) +
                                '&Utm%20Content=' + encodeURIComponent(queryParams.utm_content) +
                                '&Timezone=' + encodeURIComponent(userTimezone) +
                                '&Ip=' + encodeURIComponent(userIp) +
                                '&City=' + encodeURIComponent(userCity) +
                                '&tmid=' + encodeURIComponent(TMid) +
                                '&slugUrl=' + encodeURIComponent(slug) +
                                '&wStartDate=' + encodeURIComponent(wStartDate) +
                                '&wStartTime=' + encodeURIComponent(wStartTime);
                            
                            console.log('[DEBUG] Redirect URL:', redirectUrl);
                            window.location.href = redirectUrl;
                        }

                        function redirectToThankYouPageGoogle(TMid, shortLink, slug, name, email, phone) {
                            console.log('[DEBUG] Google redirect triggered');
                            const queryParams = getQueryParams();
                            const wStartDate = document.querySelector('.wStartDate')?.textContent.trim() || "";
                            const wStartTime = document.querySelector('.wStartTime')?.textContent.trim() || "";
                            const leadSource = document.querySelector('input[name="Lead-Source_sp"]')?.value.trim() || "Google";

                            // Corrected: Using string concatenation for URL construction
                            const redirectUrl = 'https://aoe.shreedembla.com/ty-testing-ga?FullName=' + encodeURIComponent(name) +
                                '&Email=' + encodeURIComponent(email) +
                                '&Phone=' + encodeURIComponent(phone) +
                                '&Lead-Source=' + encodeURIComponent(leadSource) +
                                '&Clid-Type=gclid&gclid=' + encodeURIComponent(queryParams.gclid) +
                                '&Utm%20Source=' + encodeURIComponent(queryParams.utm_source) +
                                '&Utm%20Medium=' + encodeURIComponent(queryParams.utm_medium) +
                                '&Utm%20Campaign=' + encodeURIComponent(queryParams.utm_campaign) +
                                '&Utm%20Term=' + encodeURIComponent(queryParams.utm_term) +
                                '&Utm%20Content=' + encodeURIComponent(queryParams.utm_content) +
                                '&Timezone=' + encodeURIComponent(userTimezone) +
                                '&Ip=' + encodeURIComponent(userIp) +
                                '&City=' + encodeURIComponent(userCity) +
                                '&tmid=' + encodeURIComponent(TMid) +
                                '&slugUrl=' + encodeURIComponent(slug) +
                                '&wStartDate=' + encodeURIComponent(wStartDate) +
                                '&wStartTime=' + encodeURIComponent(wStartTime);
                            
                            console.log('[DEBUG] Google Redirect URL:', redirectUrl);
                            window.location.href = redirectUrl;
                        }

                        function redirectToThankYouPageFacebook(TMid, shortLink, slug, name, email, phone) {
                            console.log('[DEBUG] Facebook redirect triggered');
                            const queryParams = getQueryParams();
                            const wStartDate = document.querySelector('.wStartDate')?.textContent.trim() || "";
                            const wStartTime = document.querySelector('.wStartTime')?.textContent.trim() || "";
                            const leadSource = document.querySelector('input[name="Lead-Source_sp"]')?.value.trim() || "Facebook";

                            // Corrected: Using string concatenation for URL construction
                            const redirectUrl = 'https://aoe.shreedembla.com/ty-testing-fb?FullName=' + encodeURIComponent(name) +
                                '&Email=' + encodeURIComponent(email) +
                                '&Phone=' + encodeURIComponent(phone) +
                                '&Lead-Source=' + encodeURIComponent(leadSource) +
                                '&Clid-Type=fbclid&fbclid=' + encodeURIComponent(queryParams.fbclid) +
                                '&Utm%20Source=' + encodeURIComponent(queryParams.utm_source) +
                                '&Utm%20Medium=' + encodeURIComponent(queryParams.utm_medium) +
                                '&Utm%20Campaign=' + encodeURIComponent(queryParams.utm_campaign) +
                                '&Utm%20Term=' + encodeURIComponent(queryParams.utm_term) +
                                '&Utm%20Content=' + encodeURIComponent(queryParams.utm_content) +
                                '&Timezone=' + encodeURIComponent(userTimezone) +
                                '&Ip=' + encodeURIComponent(userIp) +
                                '&City=' + encodeURIComponent(userCity) +
                                '&tmid=' + encodeURIComponent(TMid) +
                                '&slugUrl=' + encodeURIComponent(slug) +
                                '&wStartDate=' + encodeURIComponent(wStartDate) +
                                '&wStartTime=' + encodeURIComponent(wStartTime);
                            
                            console.log('[DEBUG] Facebook Redirect URL:', redirectUrl);
                            window.location.href = redirectUrl;
                        }
                    
                        // Event listeners - Modified to ensure form doesn't submit normally
                        if (form) {
                            form.addEventListener("submit", function(e) {
                                console.log('[DEBUG] Form submit event triggered');
                                e.preventDefault();
                                handleFormSubmission();
                            });
                        }
                        
                        if (submitBtn) {
                            submitBtn.addEventListener("click", function(e) {
                                console.log('[DEBUG] Submit button click event triggered');
                                e.preventDefault();
                                handleFormSubmission();
                            });
                        }

                        // Real-time phone validation
                        const phoneInput = document.querySelector('input[name="phone_sp"]');
                        if (phoneInput) {
                            phoneInput.addEventListener("input", function() {
                                const isValid = /^\\d{10}$/.test(this.value.trim()); 
                                console.log('[DEBUG] Phone input changed. Is valid:', isValid);
                                if (submitBtn) {
                                    submitBtn.style.opacity = isValid ? "1" : "0.7";
                                    submitBtn.style.pointerEvents = isValid ? "auto" : "none";
                                }
                            });
                        }
                    });
                    `,
                    {
                        headers: {
                            'Content-Type': 'application/javascript',
                            'Access-Control-Allow-Origin': origin,
                            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        },
                    }
                );
            }
        }
        return new Response('Unauthorized', { status: 403 });
    },
};
