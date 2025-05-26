import React from "react";

const testimonials = [
  { name: "Ana Silva", text: "Excelente atendimento e qualidade incrível!" },
  { name: "João Souza", text: "Entrega rápida e produto conforme descrito." },
  { name: "Maria Oliveira", text: "Comprei de novo e recomendo a todos." },
];

export const Testimonials: React.FC = () => (
  <section className="py-16">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-semibold mb-8">Depoimentos</h2>
      <div className="space-y-8">
        {testimonials.map((t, i) => (
          <blockquote
            key={i}
            className="bg-white p-6 rounded-lg shadow text-gray-700"
          >
            <p className="italic mb-4">“{t.text}”</p>
            <footer className="font-semibold text-gray-900">— {t.name}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
);

