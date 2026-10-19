import { MedicalTestRepository } from './repositories/testRepository.js';
import { ReportPresenter } from './ui/reportPresenter.js';

document.addEventListener("DOMContentLoaded", () => {
  // Dependency Injection setup
  const repository = new MedicalTestRepository();
  const presenter = new ReportPresenter(repository, window.reportAPI);
  
  presenter.init();
});