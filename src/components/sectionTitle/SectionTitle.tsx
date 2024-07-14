
import { ReactNode } from "react";
import "./SectionTitle.css";

interface SectionTitleProps {
    title: string;
    children?: ReactNode;
    fullWidth?: boolean;
    invert?: boolean;
}

/**
 * Renders a section title component.
 *
 * @component
 * @param {string} props.title - The title of the section (required)
 * @param {ReactNode} props.children - The elements to render inside the section title (optional)
 * @param {boolean} props.fullWidth - Whether the sectiontitle should have full width or the default 45rem width
 * @param {boolean} props.invert - Whether the color of the Sectiontitle should be inverted or not.
 * @returns {JSX.Element} The rendered section title component.
 */
const SectionTitle = ({ title, children, fullWidth, invert }: SectionTitleProps): JSX.Element => {
    return (
        <div className={`section-title__container ${fullWidth ? "full-width" : ""}`}>
            <div className="section-title">
                <h2>{title}</h2>
                <div className={`section__title--border ${invert ? "white" : "blue"}`}/>
            </div>
            {children}
        </div>
    );
};

export default SectionTitle;