
const Dropdown = ({ list, onChange, error, classNames, value }) => {
    return (
      <div className={`${error ? 'mb-1' : 'mb-5'}`}>
        <select
          name="role"
          id="role"
          onChange={onChange}
          defaultValue={value}
          className={classNames}>
          {list && list.map(({ value, label }) => <option value={value}>{label}</option>)}
        </select>
      </div>
    );
}
export default Dropdown;