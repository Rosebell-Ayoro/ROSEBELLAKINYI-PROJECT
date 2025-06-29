import React from "react";
export default function Footer(){
    return(
        <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-6 mt-8 border-t">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <p className="text-sm font-medium">{new Date().getFullYear()}My Education Automation System</p>
                <p className="text-sm">
                    Contact us at:{''}
                    <a
                    href="mailto:attachment.support@example.com"
                    className="text-blue-600 hover:underline"
                    >
                        attachment.support@example.com
                    </a>
                </p>
                <p className="text-sm">
                    Phone:{" "}
                    <a
                    href="tel:+254768925246"
                    className="text-blue-600 hover:underline"
                    >
                        +254768925246
                    </a>
                </p>
            </div>
        </footer>
    );
}