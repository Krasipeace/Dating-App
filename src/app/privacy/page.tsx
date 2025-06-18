import { Card, CardBody, CardHeader } from "@heroui/react";

export default function page() {
    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader className="justify-center">
                    <h2 className="text-cyan-800 text-2xl">Privacy Policy</h2>
                </CardHeader>
                <CardBody>
                    <div>
                        <h3 className="font-bold text-center text-blue-700">Introduction</h3>
                        <p>
                            Welcome to Heartbound-Dating (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We are committed to protecting your personal information and your right to privacy.
                            If you have any questions or concerns about this privacy notice or our practices with regard to your personal information,
                            please contact us at <a href="mailto:kdramaliev@gmail.com" className="font-serif">Heartbound Administration Contacts</a>.
                        </p>

                        <h3 className="font-bold text-center text-blue-700">Information We Collect</h3>
                        <p>
                            When you use our services, we collect the following types of information:
                        </p>
                        <ul>
                            <li><strong>Age:</strong> We collect your age to ensure that you are eligible to use our app, which is only available to users who are 18 years or older.</li>
                            <li><strong>Name:</strong> We collect your name to personalize your experience within the app.</li>
                            <li><strong>City and Country Location:</strong> We collect your city and country location to match you with other users in your area.</li>
                        </ul>

                        <h3 className="font-bold text-center text-blue-700">How We Use Your Information</h3>
                        <p>
                            We use the information we collect or receive in the following ways:
                        </p>
                        <ul>
                            <li><strong>To provide and maintain our service:</strong> We use your information to create and manage your account.</li>
                            <li><strong>To facilitate user connections:</strong> We use your location information to match you with other users in your area.</li>
                            <li><strong>To communicate with you:</strong> We may send you service-related emails or notifications.</li>
                        </ul>

                        <h3 className="font-bold text-center text-blue-700">Data Sharing and Disclosure</h3>
                        <p>
                            We do not share your personal information with third parties except in the following circumstances:
                        </p>
                        <ul>
                            <li><strong>With your consent:</strong> We may share or disclose your information with your consent.</li>
                            <li><strong>For legal reasons:</strong> We may share or disclose your information if we are required to do so by law or in response to valid requests by public authorities.</li>
                        </ul>

                        <h3 className="font-bold text-center text-blue-700">Data Security</h3>
                        <p>
                            We take the security of your personal information seriously and use reasonable measures to protect it. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
                        </p>

                        <h3 className="font-bold text-center text-blue-700">Cookies</h3>
                        <p>
                            We use cookies to enhance functionality and analyze usage. You can manage your preferences via our cookie consent bar. Refusing cookies may limit access to certain features(like loging in and/or registration).
                        </p>

                        <h3 className="font-bold text-center text-blue-700">Legal Basis for Processing</h3>
                        <p>
                            We process your personal data on the following legal bases under the GDPR:
                        </p>
                        <ul>
                            <li><strong>Consent:</strong> When you explicitly agree to our terms.</li>
                            <li><strong>Contract:</strong> When processing is necessary for a contract between you and us.</li>
                            <li><strong>Legal obligations:</strong> For compliance with legal requirements.</li>
                            <li><strong>Legitimate interests:</strong> Where processing is needed for our legitimate business interests and does not override your rights.</li>
                        </ul>

                        <h3 className="font-bold text-center text-blue-700">Your Privacy Rights</h3>
                        <p>
                            Depending on your location, you may have the following rights regarding your personal information:
                        </p>
                        <ul>
                            <li><strong>Access:</strong> You may request access to the personal information we hold about you.</li>
                            <li><strong>Correction:</strong> You may request that we correct any inaccuracies in your personal information.</li>
                            <li><strong>Deletion:</strong> You may request that we delete your personal information.</li>
                        </ul>
                        <p>
                            To exercise any of these rights, please contact us at <a href="mailto:kdramaliev@gmail.com" className="font-serif">Heartbound Administration Contacts</a>.
                        </p>

                        <h3 className="font-bold text-center text-blue-700">Changes to This Privacy Policy</h3>
                        <p>
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
                        </p>

                        <h3 className="font-bold text-center text-blue-700">Contact Us</h3>
                        <p>
                            If you have any questions or concerns about this privacy policy or our data practices, please contact us at <a href="mailto:kdramaliev@gmail.com" className="font-serif">Heartbound Administration Contacts</a>.
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}