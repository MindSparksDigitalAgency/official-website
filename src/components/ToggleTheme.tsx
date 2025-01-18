import { useState, useEffect, useRef } from "react";
import {
  Flex,
  Column,
  Button,
  Dialog,
  IconButton,
  ToggleButton,
} from "@/once-ui/components";
import { style, updateTheme } from "@/app/resources/config";

export const ToggleTheme: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [theme, setTheme] = useState<string>(style.theme);
  const iconButtonRef = useRef<HTMLButtonElement | null>(null); // Ref untuk IconButton
  const [dialogPosition, setDialogPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 30 });

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const changeTheme = (selectedTheme: string) => {
    setTheme(selectedTheme);
    updateTheme(selectedTheme);
    document.body.setAttribute("data-theme", selectedTheme);
  };

  useEffect(() => {
    // Set initial theme on page load
    document.body.setAttribute("data-theme", theme);

    // Update dialog position when icon button is clicked
    if (iconButtonRef.current) {
      const { top, left, height } =
        iconButtonRef.current.getBoundingClientRect();
      setDialogPosition({
        top: top + height + 10, // Menambahkan jarak dari bawah IconButton
        left: left,
      });
    }

    const handleThemeChange = (event: CustomEvent) => {
      setTheme(event.detail);
      document.body.setAttribute("data-theme", event.detail);
    };

    document.addEventListener(
      "themeChanged",
      handleThemeChange as EventListener
    );

    return () => {
      document.removeEventListener(
        "themeChanged",
        handleThemeChange as EventListener
      );
    };
  }, [theme]);

  return (
    <Flex>
      <IconButton
        ref={iconButtonRef} // Menambahkan ref ke IconButton
        icon="HiOutlineSparkles"
        size="m"
        tooltip={
          theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
        }
        tooltipPosition="left"
        variant={theme === "dark" ? "primary" : "secondary"}
        onClick={toggleDialog}
      />

      <Dialog
        isOpen={isDialogOpen}
        onClose={toggleDialog}
        title="Select Theme"
        description="Choose your preferred theme below."
        footer={""}
        style={{
          position: "absolute",
          top: dialogPosition.top - 50,
          left: dialogPosition.left - 630,
          zIndex: 9999, // Menempatkan dialog di atas elemen lainnya
        }}
      >
        <Flex paddingX="12" fillWidth>
          <div className="display-flex radius-m flex-row min-width-0 fill-width position-relative Scroller_scroller__KVYp_ Scroller_row__eEosH">
            <div className="display-flex g-horizontal--1 min-width-0 fill-width">
              <button
                className={`ToggleButton_button__Wgd1S ToggleButton_outline__ttErt ToggleButton_l__fkPpv radius-l-left text-decoration-none button cursor-interactive fill-width justify-center ${
                  theme === "light" ? "ToggleButton_selected__CqoUu" : ""
                }`}
                role="tab"
                aria-selected={theme === "light" ? "true" : "false"}
                aria-controls="panel-light"
                value="light"
                onClick={() => changeTheme("light")}
              >
                <div
                  className="display-inline-flex fit position-relative color-inherit Icon_m__zZnS1"
                  role="presentation"
                  aria-hidden="true"
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    ></path>
                  </svg>
                </div>
                <div className="display-flex p-4 font-label font-m font-default">
                  Light
                </div>
              </button>
              <button
                className={`ToggleButton_button__Wgd1S ToggleButton_outline__ttErt ToggleButton_l__fkPpv radius-l-right text-decoration-none button cursor-interactive fill-width justify-center ${
                  theme === "dark" ? "ToggleButton_selected__CqoUu" : ""
                }`}
                role="tab"
                aria-selected={theme === "dark" ? "true" : "false"}
                aria-controls="panel-dark"
                value="dark"
                onClick={() => changeTheme("dark")}
              >
                <div
                  className="display-inline-flex fit position-relative color-inherit Icon_m__zZnS1"
                  role="presentation"
                  aria-hidden="true"
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    ></path>
                  </svg>
                </div>
                <div className="display-flex p-4 font-label font-m font-default">
                  Dark
                </div>
              </button>
            </div>
          </div>
        </Flex>
      </Dialog>
    </Flex>
  );
};
