function LogoMinimized() {
  const src = "/logo-small.png";
  return (
    <img
      src={src}
      alt="Minimized Logo"
      className="h-10 w-10 object-contain"
    />
  );
}

export { LogoMinimized };
