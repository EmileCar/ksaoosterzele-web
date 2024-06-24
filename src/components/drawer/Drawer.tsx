import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import './Drawer.css';

const Drawer = ({children, isOpenFromLoad} : {children: React.ReactNode, isOpenFromLoad?: boolean}) => {
	if (isOpenFromLoad === null || isOpenFromLoad === undefined) isOpenFromLoad = true;

	const [isOpen, setIsOpen] = useState(isOpenFromLoad);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [isResizing, setIsResizing] = useState(false);
	const [sidebarWidth, setSidebarWidth] = useState(268);

	function toggleDrawer() {
		setIsOpen(!isOpen);
		setSidebarWidth(isOpen ?  32 : 268);
	}

	const startResizing = useCallback((mouseDownEvent : React.MouseEvent) => {
		setIsResizing(true);
	}, []);

	const stopResizing = useCallback(() => {
		setIsResizing(false);
	}, []);

	const resize = useCallback(
		(mouseMoveEvent : MouseEvent) => {
		  if (isResizing && sidebarRef.current) {
			setSidebarWidth(
			  mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left
			);
		  }
		},
		[isResizing]
	);

	useEffect(() => {
		window.addEventListener("mousemove", resize);
		window.addEventListener("mouseup", stopResizing);
		return () => {
		  window.removeEventListener("mousemove", resize);
		  window.removeEventListener("mouseup", stopResizing);
		};
	  }, [resize, stopResizing]);

	  return (
		<div
			className={`drawer ${isOpen && "drawer-minWidth"}`}
			ref={sidebarRef}
			onMouseDown={(e) => e.preventDefault()}
			style={isOpen ? { width: sidebarWidth! } : undefined}
		>
			{isOpen && <div className='drawer__content'>{children}</div>}
			<div className="drawer__toggle" onClick={toggleDrawer}>
				{isOpen ? ">" : "<"}
			</div>
			{isOpen && <div className="drawer-resizer" onMouseDown={startResizing} />}
		</div>
	);
}

export default Drawer;