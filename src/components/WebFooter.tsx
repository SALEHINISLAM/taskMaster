const WebsiteFooter = () => {
    return (
        <footer className="w-full p-5 border-t border-gray-200 bg-white py-4">
            <div className="container mx-auto flex flex-col items-center justify-between space-y-4 text-center md:flex-row md:space-y-0">
                <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()} TaskMaster. All rights reserved.
                </p>
                <div className="flex space-x-6">
                    <a
                        href="https://github.com/SALEHINISLAM/taskMaster"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                    >
                        GitHub
                    </a>
                    
                </div>
            </div>
        </footer>
    );
};

export default WebsiteFooter;

