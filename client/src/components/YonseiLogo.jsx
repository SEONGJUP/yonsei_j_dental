function YonseiLogo({ size = 40, className = '' }) {
  return (
    <img
      className={className}
      src="/yonsei-logo.png"
      alt="연세대학교 로고"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  );
}

export default YonseiLogo;
