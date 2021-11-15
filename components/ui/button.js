import Link from 'next/link';
import classes from './button.module.css';

export default function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link}>
        {/* Add own <a> tag to add classes/// Dont add href here tho */}
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }
  return (
    <button classesName={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
