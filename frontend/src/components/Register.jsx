import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';

const Register = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Token de convite ausente.');
      setLoading(false);
      return;
    }
    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      const response = await api.get(`/invitations/${token}`);
      if (response.ok) {
        const data = await response.json();
        setInvitation(data);
      } else {
        setError('Convite inválido ou expirado.');
      }
    } catch (err) {
      setError('Erro ao validar convite.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await api.post('/register', {
        token,
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (response.ok) {
        alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
        navigate('/login');
      } else {
        const data = await response.json();
        alert(data.detail || 'Erro ao realizar cadastro.');
      }
    } catch (err) {
      alert('Erro de conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="login-container">Validando convite...</div>;

  if (error) return (
    <div className="login-container">
      <div className="login-box card-premium">
        <h2 style={{ color: '#ef4444' }}>Ops!</h2>
        <p>{error}</p>
        <button className="login-btn" onClick={() => navigate('/login')} style={{ marginTop: '1rem' }}>Voltar ao Login</button>
      </div>
    </div>
  );

  return (
    <div className="login-container">
      <div className="login-box card-premium">
        <div className="login-header">
          <div className="login-logo">🤖</div>
          <h1>Criar sua Conta</h1>
          <p>Você foi convidado como <strong>{invitation.target_role}</strong></p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>NOME COMPLETO</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="Como deseja ser chamado?"
            />
          </div>
          <div className="form-group">
            <label>E-MAIL</label>
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="seu@email.com"
            />
          </div>
          <div className="form-group">
            <label>SENHA</label>
            <input 
              type="password" 
              required 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              placeholder="........"
            />
          </div>
          <div className="form-group">
            <label>CONFIRMAR SENHA</label>
            <input 
              type="password" 
              required 
              value={formData.confirmPassword}
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="........"
            />
          </div>
          
          <button type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
