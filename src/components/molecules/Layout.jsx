const Layout = ({ children }) => {
	return (
		<div className='flex items-stretch justify-start w-screen min-h-screen bg-gray-bg'>
			{children}
		</div>
	);
};

export default Layout;
