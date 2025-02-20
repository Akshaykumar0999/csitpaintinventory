import './index.css'

const SettingsItem = ({ details, updateActiveTab, isActive }) => {
  const { id, icon, name } = details;
  const activeStyles = isActive ? "settings-tablist-item-active"
        : "settings-tablist-item"
  return (
    <li
      key={id}
      className={`${activeStyles}`}
      onClick={() => updateActiveTab(id)}
    >
      {icon}
      {name}
    </li>
  );
};

export default SettingsItem