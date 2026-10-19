import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { academics, journey } from '../data.js';

function Timeline({ items, type }) {
  return (
    <div className={`timeline timeline-${type}`}>
      <span className="timeline-base" aria-hidden="true" />
      <span className="timeline-progress" aria-hidden="true" />
      {items.map((item, index) => (
        <motion.article
          className="timeline-item"
          key={item.title || item[0]}
          data-timeline-item
          initial={{ opacity: 0.38, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, delay: index * 0.06 }}
        >
          <span className="timeline-dot" aria-hidden="true" />
          {type === 'academic' ? (
            <>
              <small>{item.date}</small>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.badge ? <span className="grade-pill">{item.badge}</span> : null}
              {item.semesters ? (
                <div className="semester-list">
                  {item.semesters.map((semester) => (
                    <div className={semester.current ? 'semester-row semester-current' : 'semester-row'} key={semester.name}>
                      <span>{semester.name}<small>{semester.range}</small></span>
                      <b>{semester.grade}</b>
                    </div>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <>
              <small>Stage {String(index + 1).padStart(2, '0')}</small>
              <h3>{item[0]}</h3>
              <p>{item[1]}</p>
            </>
          )}
        </motion.article>
      ))}
    </div>
  );
}

export function AcademicsSection() {
  return (
    <section className="section-shell" id="academics">
      <SectionHeading number="02" label="Academics" title="Academic" emphasis="journey" description="Where the fundamentals were built." />
      <Timeline items={academics} type="academic" />
    </section>
  );
}

export function JourneySection() {
  return (
    <section className="section-shell" id="journey">
      <SectionHeading number="05" label="Journey" title="The road" emphasis="so far" description="Small steps. Meaningful progress." />
      <Timeline items={journey} type="journey" />
    </section>
  );
}
