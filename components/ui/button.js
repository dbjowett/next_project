import Link from 'next/link';
import classes from './button.module.css';

export default function Button(props) {
  return (
    <Link href={props.link}>
      {/* Add own <a> tag to add classes/// Dont add href here tho */}
      <a className={classes.btn}>{props.children}</a>
    </Link>
  );
}
